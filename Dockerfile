FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy the .csproj file using the EXACT relative path
COPY StudentSystem.API/StudentSystem.API.csproj StudentSystem.API/
RUN dotnet restore "StudentSystem.API/StudentSystem.API.csproj"

# Copy everything else and publish the app
COPY . .
WORKDIR /app/StudentSystem.API
RUN dotnet publish -c Release -o /app/publish

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080
ENTRYPOINT ["dotnet", "StudentSystem.API.dll"]
