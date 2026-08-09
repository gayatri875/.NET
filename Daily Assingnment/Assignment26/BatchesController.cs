using _8Aug.Data;
using _8Aug.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace _8Aug.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BatchesController : ControllerBase
    {
        // Used to access the database
        private readonly AppDbContext _context;

        // Receives the database context
        public BatchesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/batches
        // Gets all batches
        [HttpGet]
        public IActionResult GetBatches()
        {
            var batches = _context.Batches.ToList();

            return Ok(batches);
        }

        // GET: api/batches/1
        // Gets a batch by ID
        [HttpGet("{id}")]
        public IActionResult GetBatch(int id)
        {
            var batch = _context.Batches.Find(id);

            // Checks if the batch exists
            if (batch == null)
            {
                return NotFound();
            }

            return Ok(batch);
        }

        // POST: api/batches
        // Adds a new batch
        [HttpPost]
        public IActionResult AddBatch(Batch batch)
        {
            _context.Batches.Add(batch);

            // Saves the batch to the database
            _context.SaveChanges();

            return Ok(batch);
        }

        // PUT: api/batches/1
        // Updates an existing batch
        [HttpPut("{id}")]
        public IActionResult UpdateBatch(int id, Batch batch)
        {
            // Finds the existing batch
            var existingBatch = _context.Batches.Find(id);

            // Checks if the batch exists
            if (existingBatch == null)
            {
                return NotFound();
            }

            // Updates batch details
            existingBatch.BatchName = batch.BatchName;
            existingBatch.StartDate = batch.StartDate;

            // Saves the changes to the database
            _context.SaveChanges();

            return Ok(existingBatch);
        }

        // DELETE: api/batches/1
        // Deletes a batch
        [HttpDelete("{id}")]
        public IActionResult DeleteBatch(int id)
        {
            // Finds the batch
            var batch = _context.Batches.Find(id);

            // Checks if the batch exists
            if (batch == null)
            {
                return NotFound();
            }

            // Removes the batch
            _context.Batches.Remove(batch);

            // Saves the changes to the database
            _context.SaveChanges();

            return Ok("Batch deleted successfully");
        }
    }
}
