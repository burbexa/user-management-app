using UserManagementApi.Features.Users.Models;
using UserManagementApi.Services;

namespace UserManagementApi.Features.Users
{
    public class AddUser : IEndpoint
    {
        public void MapEndpoints(WebApplication app)
        {
            app.MapPost("/api/users", (User user, UserService service) =>
            {
                if (string.IsNullOrWhiteSpace(user.Name) || string.IsNullOrWhiteSpace(user.Email))
                    return Results.BadRequest("Name and Email are required.");

                service.AddUser(user);
                return Results.Created($"/api/users/{user.Id}", user);
            }).WithName("AddUser");
        }
    }
}
