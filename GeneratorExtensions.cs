using Microsoft.AspNetCore.Builder;

namespace DocumentDBGettingStarted
{
  public static class GeneratorExtensions
  {
    public static IApplicationBuilder UseGenerator(this IApplicationBuilder builder)
    {
      return builder.UseMiddleware<GeneratorMiddleware>();
    }
  }
}
