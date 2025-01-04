using ProductApi.Domain.Entities;
using ProductApi.Application.Services;
using ProductApi.Domain.Interfaces;


namespace Application.Services.ServicesImpl
{

    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;

        public ProductService(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        public async Task<IEnumerable<Product>> GetAllAsync()
        {
            return await _productRepository.GetAllAsync();
        }

        public async Task<Product> GetByIdAsync(long id)
        {
            return await _productRepository.GetByIdAsync(id);
        }

        public async Task<IEnumerable<Product>> GetByCategoryIdAsync(long categoryId)
        {
            return await _productRepository.GetByCategoryIdAsync(categoryId);
        }

        public async Task AddAsync(Product product)
        {
            await _productRepository.AddAsync(product);
        }

    /* 
     * public async Task UpdateAsync(Product product)
        {
            await _productRepository.UpdateAsync(product);
        }
    */
        public async Task DeleteAsync(long id)
        {
            await _productRepository.DeleteAsync(id);
        }
    }
}
