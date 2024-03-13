using KhatWebServices.Models;
using Microsoft.AspNetCore.Mvc;

namespace KhatWebServices.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

        private readonly ILogger<WeatherForecastController> _logger;
        private readonly KhatTestContext _khatDataContext;
        public WeatherForecastController(ILogger<WeatherForecastController> logger, KhatTestContext khatDataContext)
        {
            _logger = logger;
            _khatDataContext = khatDataContext;
        }

        [HttpGet(Name = "GetWeatherForecast")]
        public IEnumerable<Gender> Get()
        {
            return _khatDataContext.Genders.ToList();   
        }
    }
}