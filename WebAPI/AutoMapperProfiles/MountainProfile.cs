using AutoMapper;
using ClassLibraryProject.Models;
using WebAPI.Dtos.Mountain;

namespace WebAPI.AutoMapperProfiles
{
    public class MountainProfile : Profile
    {
        public MountainProfile()
        {
            CreateMap<Mountain, MountainGetterDto>();
        }
    }
}
