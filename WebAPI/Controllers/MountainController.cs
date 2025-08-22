using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using ServiceLibraryProject;
using WebAPI.Dtos.Mountain;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MountainController : ControllerBase
    {
        private readonly IMountainService _mountainService;
        private readonly IMapper _mapper;

        public MountainController(IMountainService mountainService, IMapper mapper)
        {
            _mountainService = mountainService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<MountainPagedResultDto>> GetAll([FromQuery] MountainQueryDto query)
        {
            var (data, total) = await _mountainService.GetPagedAsync(
                query.Page, 
                query.PageSize, 
                query.Name, 
                query.Location,
                query.MinHeight,
                query.MaxHeight
            );
            
            var result = new MountainPagedResultDto
            {
                Data = _mapper.Map<IEnumerable<MountainGetterDto>>(data),
                Total = total
            };
            
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<MountainGetterDto>> GetById(int id)
        {
            var mountain = await _mountainService.GetByIdAsync(id);
            
            if (mountain == null)
            {
                return NotFound($"Mountain with ID {id} not found.");
            }
            
            var result = _mapper.Map<MountainGetterDto>(mountain);
            return Ok(result);
        }
    }
}
