using ECommerce.Data;
using ECommerce.Middleware;
using ECommerce.Repository;
using ECommerce.RepositoryImplementation;
using ECommerce.Services;
using ECommerceAPI.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// ==========================================
// Controllers
// ==========================================
builder.Services.AddControllers();

// ==========================================
// Database
// ==========================================
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")
    ));

// ==========================================
// CORS
// ==========================================
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

// ==========================================
// JWT Authentication
// ==========================================
builder.Services
    .AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,

            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],

            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(
                    builder.Configuration["Jwt:Key"]!
                )
            ),

            RoleClaimType = ClaimTypes.Role,
            NameClaimType = ClaimTypes.NameIdentifier
        };
    });

builder.Services.AddAuthorization();

// ==========================================
// OpenAPI
// ==========================================
builder.Services.AddOpenApi();

// ==========================================
// Swagger
// ==========================================
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("Bearer",
        new Microsoft.OpenApi.OpenApiSecurityScheme
        {
            Type = Microsoft.OpenApi.SecuritySchemeType.Http,
            Scheme = "bearer",
            BearerFormat = "JWT",
            Description = "Enter ONLY the raw token, without the word 'Bearer'. Swagger prefixes it automatically."
        });

    options.AddSecurityRequirement(document =>
        new Microsoft.OpenApi.OpenApiSecurityRequirement
        {
            [
                new Microsoft.OpenApi.OpenApiSecuritySchemeReference(
                    "Bearer",
                    document)
            ] = new List<string>()
        });
});

// ==========================================
// Dependency Injection
// ==========================================
builder.Services.AddScoped<ProductService>();
builder.Services.AddScoped<IProductRepository, ProductRepository>();

builder.Services.AddScoped<CategoryService>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();

builder.Services.AddScoped<CustomerService>();
builder.Services.AddScoped<ICustomerRepository, CustomerRepository>();

builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<IUserRepository, UserRepository>();

builder.Services.AddScoped<CartService>();
builder.Services.AddScoped<ICartRepository, CartRepository>();

builder.Services.AddScoped<ShippingService>();
builder.Services.AddScoped<IShippingRepository, ShippingRepository>();

builder.Services.AddScoped<ReturnService>();
builder.Services.AddScoped<IReturnRepository, ReturnRepository>();

builder.Services.AddScoped<OrderService>();
builder.Services.AddScoped<IOrderRepository, OrderRepository>();

builder.Services.AddScoped<AuthService>();

var app = builder.Build();

// ==========================================
// Database Seed Data
// ==========================================
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider
        .GetRequiredService<AppDbContext>();

    DbInitializer.Initialize(context);
}

// ==========================================
// Exception Middleware
// ==========================================
app.UseMiddleware<ExceptionMiddleware>();

// ==========================================
// Swagger
// ==========================================
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI();
}

// ==========================================
// HTTPS
// ==========================================
app.UseHttpsRedirection();

// ==========================================
// Routing
// ==========================================
app.UseRouting();

// ==========================================
// CORS
// ==========================================
app.UseCors("AllowFrontend");

// ==========================================
// Request Logging
// ==========================================
app.UseMiddleware<RequestLoggingMiddleware>();

// ==========================================
// Authentication & Authorization
// ==========================================
app.UseAuthentication();
app.UseAuthorization();

// ==========================================
// Controllers
// ==========================================
app.MapControllers();

// ==========================================
// SEED ADMIN
// ==========================================
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider
        .GetRequiredService<AppDbContext>();

    var admin = await context.Users
        .FirstOrDefaultAsync(u =>
            u.Email == "admin@ecommerce.com");

    if (admin == null)
    {
        admin = new User
        {
            Name = "Administrator",
            Email = "admin@ecommerce.com",
            Role = "Admin",
            CreatedAt = DateTime.UtcNow,
            IsActive = true,
            PasswordHash =
                BCrypt.Net.BCrypt.HashPassword("Admin@123")
        };

        context.Users.Add(admin);
    }
    else
    {
        admin.Name = "Administrator";
        admin.Role = "Admin";
        admin.IsActive = true;

        admin.PasswordHash =
            BCrypt.Net.BCrypt.HashPassword("Admin@123");
    }

    await context.SaveChangesAsync();
}

app.Run();