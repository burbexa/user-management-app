using UserManagementApi.Services;

namespace UserManagementApi.Features.Users
{
    public class GetUserById : IEndpoint
    {
        public void MapEndpoints(WebApplication app)
        {
            app.MapGet("/api/users/{id:int}", async (int id, UserService service) =>
            {
                var user = await service.GetUserByIdAsync(id);
                return user is not null ? Results.Ok(user) : Results.NotFound();
            }).WithName("GetUserById");
        }
    }
}
