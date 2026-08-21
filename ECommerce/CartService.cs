using ECommerce.DTOs.Cart;
using ECommerce.Models;
using ECommerce.Repository;

namespace ECommerce.Services
{
    public class CartService
    {
        private readonly ICartRepository _cartRepository;

        public CartService(
            ICartRepository cartRepository)
        {
            _cartRepository = cartRepository;
        }

        // ==========================================
        // GET CART BY CUSTOMER
        // ==========================================
        public async Task<CartResponse?> GetByCustomerIdAsync(
            int customerId)
        {
            if (customerId <= 0)
            {
                return null;
            }

            var cart =
                await _cartRepository
                    .GetByCustomerIdAsync(customerId);

            if (cart == null)
            {
                return null;
            }

            return MapToResponse(cart);
        }

        // ==========================================
        // GET CART BY ID
        // ==========================================
        public async Task<CartResponse?> GetByIdAsync(
            int id)
        {
            if (id <= 0)
            {
                return null;
            }

            var cart =
                await _cartRepository
                    .GetByIdAsync(id);

            if (cart == null)
            {
                return null;
            }

            return MapToResponse(cart);
        }

        // ==========================================
        // ADD PRODUCT TO CART
        // ==========================================
        public async Task<CartResponse> AddToCartAsync(
            AddToCartRequest request)
        {
            if (request == null)
            {
                throw new Exception(
                    "Cart data is required.");
            }

            if (request.CustomerId <= 0)
            {
                throw new Exception(
                    "CustomerId is required.");
            }

            if (request.ProductId <= 0)
            {
                throw new Exception(
                    "ProductId is required.");
            }

            if (request.Quantity <= 0)
            {
                throw new Exception(
                    "Quantity must be greater than zero.");
            }

            var cart =
                await _cartRepository
                    .GetByCustomerIdAsync(
                        request.CustomerId);

            // ======================================
            // CREATE NEW CART
            // ======================================
            if (cart == null)
            {
                cart = new Cart
                {
                    CustomerId =
                        request.CustomerId
                };

                cart.Items.Add(
                    new CartItem
                    {
                        ProductId =
                            request.ProductId,

                        Quantity =
                            request.Quantity
                    });

                cart =
                    await _cartRepository
                        .AddAsync(cart);
            }
            else
            {
                // ==================================
                // FIND EXISTING PRODUCT
                // ==================================
                var existingItem =
                    cart.Items.FirstOrDefault(
                        i =>
                            i.ProductId ==
                            request.ProductId);

                if (existingItem != null)
                {
                    existingItem.Quantity +=
                        request.Quantity;
                }
                else
                {
                    cart.Items.Add(
                        new CartItem
                        {
                            CartId =
                                cart.Id,

                            ProductId =
                                request.ProductId,

                            Quantity =
                                request.Quantity
                        });
                }

                cart =
                    await _cartRepository
                        .UpdateAsync(cart);
            }

            // ======================================
            // RELOAD CART
            // ======================================
            var updatedCart =
                await _cartRepository
                    .GetByIdAsync(cart.Id);

            if (updatedCart == null)
            {
                throw new Exception(
                    "Cart could not be loaded.");
            }

            return MapToResponse(
                updatedCart);
        }

        // ==========================================
        // UPDATE CART ITEM QUANTITY
        // ==========================================
        public async Task<CartResponse?> UpdateQuantityAsync(
            int cartItemId,
            int quantity)
        {
            if (cartItemId <= 0)
            {
                throw new Exception(
                    "Cart item ID is required.");
            }

            if (quantity <= 0)
            {
                throw new Exception(
                    "Quantity must be greater than zero.");
            }

            var cartItem =
                await _cartRepository
                    .GetCartItemByIdAsync(
                        cartItemId);

            if (cartItem == null)
            {
                return null;
            }

            cartItem.Quantity =
                quantity;

            await _cartRepository
                .UpdateCartItemAsync(
                    cartItem);

            var updatedCart =
                await _cartRepository
                    .GetByIdAsync(
                        cartItem.CartId);

            if (updatedCart == null)
            {
                return null;
            }

            return MapToResponse(
                updatedCart);
        }

        // ==========================================
        // DELETE CART ITEM
        // ==========================================
        public async Task<bool> DeleteAsync(
            int cartItemId)
        {
            if (cartItemId <= 0)
            {
                return false;
            }

            return await _cartRepository
                .DeleteCartItemAsync(
                    cartItemId);
        }

        // ==========================================
        // CLEAR CUSTOMER CART
        // ==========================================
        public async Task<bool> ClearCartAsync(
            int customerId)
        {
            if (customerId <= 0)
            {
                return false;
            }

            return await _cartRepository
                .ClearByCustomerIdAsync(
                    customerId);
        }

        // ==========================================
        // MAP MODEL → DTO
        // ==========================================
        private static CartResponse MapToResponse(
            Cart cart)
        {
            return new CartResponse
            {
                Id =
                    cart.Id,

                CustomerId =
                    cart.CustomerId,

                Items =
                    cart.Items
                        .Select(item =>
                            new CartItemResponse
                            {
                                Id =
                                    item.Id,

                                ProductId =
                                    item.ProductId,

                                ProductName =
                                    item.Product?.Name
                                    ?? string.Empty,

                                UnitPrice =
                                    item.Product?.Price
                                    ?? 0,

                                Quantity =
                                    item.Quantity,

                                TotalPrice =
                                    (item.Product?.Price ?? 0)
                                    * item.Quantity
                            })
                        .ToList()
            };
        }
    }
}