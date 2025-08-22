using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ClassLibraryProject.Models;
using Microsoft.EntityFrameworkCore;
using RepositoryLibraryProject.Data;

namespace ServiceLibraryProject
{
    public interface IMountainService
    {
        Task<List<Mountain>> GetAllAsync();
        Task<(List<Mountain> data, int total)> GetPagedAsync(int page, int pageSize, string? name = null, string? location = null, double? minHeight = null, double? maxHeight = null);
        Task<Mountain?> GetByIdAsync(int id);
    }

    public class MountainService : IMountainService
    {
        private readonly AppDbContext _context;
        public MountainService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Mountain>> GetAllAsync()
        {
            return await _context.Mountain.ToListAsync();
        }

        public async Task<(List<Mountain> data, int total)> GetPagedAsync(int page, int pageSize, string? name = null, string? location = null, double? minHeight = null, double? maxHeight = null)
        {
            var query = _context.Mountain.AsQueryable();

            // Aplicar filtros
            if (!string.IsNullOrEmpty(name))
            {
                query = query.Where(m => m.Name.Contains(name));
            }

            if (!string.IsNullOrEmpty(location))
            {
                query = query.Where(m => m.Location.Contains(location));
            }

            if (minHeight.HasValue)
            {
                query = query.Where(m => m.Height >= minHeight.Value);
            }

            if (maxHeight.HasValue)
            {
                query = query.Where(m => m.Height <= maxHeight.Value);
            }

            // Obtener total antes de aplicar paginación
            var total = await query.CountAsync();

            // Aplicar paginación
            var data = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return (data, total);
        }

        public async Task<Mountain?> GetByIdAsync(int id)
        {
            return await _context.Mountain.FirstOrDefaultAsync(m => m.Id == id);
        }
    }
}
