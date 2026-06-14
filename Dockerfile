FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY backend/GestionPae.Api/GestionPae.Api.csproj backend/GestionPae.Api/
RUN dotnet restore backend/GestionPae.Api/GestionPae.Api.csproj
COPY backend/ backend/
COPY database/ database/
RUN dotnet publish backend/GestionPae.Api/GestionPae.Api.csproj -c Release -o /app

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app ./
EXPOSE 8080
ENTRYPOINT ["dotnet", "GestionPae.Api.dll"]
