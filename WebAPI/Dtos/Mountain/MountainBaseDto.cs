using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WebAPI.Dtos.Mountain
{
    public class MountainBaseDto : IValidatableObject
    {
        [Required(ErrorMessage = "ERR001: El campo Nombre es obligatorio")]
        [StringLength(100, MinimumLength = 1, ErrorMessage = "ERR002: El nombre debe tener entre 1 y 100 caracteres")]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "ERR003: El campo Altura es obligatorio")]
        [Range(0, 9000, ErrorMessage = "ERR004: La altura debe estar entre 0 y 9000 metros")]
        public double Height { get; set; }

        [Required(ErrorMessage = "ERR005: El campo Ubicación es obligatorio")]
        [StringLength(100, MinimumLength = 1, ErrorMessage = "ERR006: La ubicación debe tener entre 1 y 100 caracteres")]
        public string Location { get; set; } = string.Empty;

        public DateTime? AscentDate { get; set; }

        public bool IsClimbed { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (Height < 0)
            {
                yield return new ValidationResult("La altura no puede ser negativa.", new[] { nameof(Height) });
            }
        }
    }
}
