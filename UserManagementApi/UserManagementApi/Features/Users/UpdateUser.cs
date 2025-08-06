using UserManagementApi.Features.Users.Models;
using UserManagementApi.Services;

namespace UserManagementApi.Features.Users
{
    public class UpdateUser : IEndpoint
    {
        public void MapEndpoints(WebApplication app)
        {
            app.MapPut("/api/users/{id:int}", (int id, User user, UserService service) =>
            {
                if (string.IsNullOrWhiteSpace(user.Name) || string.IsNullOrWhiteSpace(user.Email))
                    return Results.BadRequest("Name and Email are required.");

                var updated = service.UpdateUser(id, user);
                return updated ? Results.Ok(user) : Results.NotFound();
            }).WithName("UpdateUser");
        }
    }
}
