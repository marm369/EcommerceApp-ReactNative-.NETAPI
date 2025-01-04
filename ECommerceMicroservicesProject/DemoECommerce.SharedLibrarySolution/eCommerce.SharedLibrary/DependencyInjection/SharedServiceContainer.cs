﻿using eCommerce.SharedLibrary.Middleware;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Serilog;

namespace eCommerce.SharedLibrary.DependencyInjection
{
    public static class SharedServiceContainer
    {
        public static IServiceCollection AddSharedServices<TContext>(this IServiceCollection services, IConfiguration config, string fileName)
            where TContext : DbContext
        {

            // Add Generic Database context
            services.AddDbContext<TContext>(options =>
                options.UseSqlServer(
                    config.GetConnectionString("eCommerceConnection"),
                    sqlServerOptions =>
                        sqlServerOptions.EnableRetryOnFailure(
                            maxRetryCount: 5,
                            maxRetryDelay: TimeSpan.FromSeconds(10),
                            errorNumbersToAdd: null)));

            // Configure Serilog logging
            Log.Logger = new LoggerConfiguration()
                .MinimumLevel.Information()
                .WriteTo.Debug()
                .WriteTo.Console()
                .WriteTo.File(
                    path: $"{fileName}-.log",
                    restrictedToMinimumLevel: Serilog.Events.LogEventLevel.Information,
                    outputTemplate: "{Timestamp:yyyy-MM-dd HH:mm:ss.fff zzz} [{Level:u3}] {Message:lj}{NewLine}{Exception}",
                    rollingInterval: RollingInterval.Day)
                .CreateLogger();

            // Add JWT authentication Scheme
            JWTAutenticationScheme.addJWTAuthenticationScheme(services, config);

            return services;
        }

        public static IApplicationBuilder UseSharedPolicies(this IApplicationBuilder app)
        {
            // Use global exception handling
            app.UseMiddleware<GlobalException>();

            // Register middleware to block all outsiders API calls
            app.UseMiddleware<ListenToOnlyApiGateway>();

            return app;
        }
    }
}