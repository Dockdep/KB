using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Azure.Documents.Client;
using Microsoft.Azure.Documents.Linq;
using DocumentDBGettingStarted.Models;
using Microsoft.Azure.Documents;
using System.Linq.Expressions;

namespace DocumentDBGettingStarted.Repository
{
    public class ArticleDocumentDBRepository : IRepository<Article,string>
    {
        private const string EndpointUri = "https://single-page-aplication.documents.azure.com:443/";
        private const string PrimaryKey = "Up4bHXTTlUGw7MkB1C1qCg8QX1zDxdzbfWtCZzpNbVfsJ7nU6ShaThFNQxTUUHFt04sya1pEaMsLDtAq0vNHig==";
        private static readonly string DatabaseId = "KnowledgeBase";
        private static readonly string CollectionId = "Article";
        private DocumentClient _client;

        public ArticleDocumentDBRepository()
        {
            _client = new DocumentClient(new Uri(EndpointUri), PrimaryKey);
            CreateDatabaseIfNotExistsAsync().Wait();
            CreateCollectionIfNotExistsAsync().Wait();
        }

        private async Task CreateDatabaseIfNotExistsAsync()
        {
            try
            {
                await _client.ReadDatabaseAsync(UriFactory.CreateDatabaseUri(DatabaseId));
            }
            catch (DocumentClientException e)
            {
                if (e.StatusCode == System.Net.HttpStatusCode.NotFound)
                {
                    await _client.CreateDatabaseAsync(new Database { Id = DatabaseId });
                }
                else
                {
                    throw;
                }
            }
        }

        private async Task CreateCollectionIfNotExistsAsync()
        {
            try
            {
                await _client.ReadDocumentCollectionAsync(
                    UriFactory.CreateDocumentCollectionUri(DatabaseId, CollectionId));
            }
            catch (DocumentClientException e)
            {
                if (e.StatusCode == System.Net.HttpStatusCode.NotFound)
                {
                    await _client.CreateDocumentCollectionAsync(
                        UriFactory.CreateDatabaseUri(DatabaseId),
                        new DocumentCollection { Id = CollectionId },
                        new RequestOptions { OfferThroughput = 1000 });
                }
                else
                {
                    throw;
                }
            }
        }

        public IEnumerable<Article> GetAllList()
        {
            try
            {    
                IQueryable<Article> results = _client.CreateDocumentQuery<Article>(
                        UriFactory.CreateDocumentCollectionUri(DatabaseId, CollectionId));

                return results.ToList();

            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }

        }

        public async Task<IEnumerable<Article>> GetAllListWhere()
        {
          return await GetAllListWhere((s) => true);
        }

        public async Task<IEnumerable<Article>> GetAllListWhere(Expression<Func<Article, bool>> predicate)
        {
            try
            {
                IDocumentQuery<Article> query = _client.CreateDocumentQuery<Article>(
                UriFactory.CreateDocumentCollectionUri(DatabaseId, CollectionId))
                .Where(predicate)
                .AsDocumentQuery();

                List<Article> results = new List<Article>();
                while (query.HasMoreResults)
                {
                  results.AddRange(await query.ExecuteNextAsync<Article>());
                }

                return results;

            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }

        }
        public async Task<Article> Details(string id)
        {
            try
            {
                var result = await _client.ReadDocumentAsync(UriFactory.CreateDocumentUri(DatabaseId, CollectionId, id));
                return (Article)(dynamic)result.Resource;
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public void Create(Article data)
        {
            try
            {
                 _client.CreateDocumentAsync
                   (UriFactory.CreateDocumentCollectionUri(DatabaseId, CollectionId), data);
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public void Update(string id, Article data)
        {
            _client.ReplaceDocumentAsync
                (UriFactory.CreateDocumentUri(DatabaseId, CollectionId, id), data);
        }

        public void Delete(string id)
        {
            _client.DeleteDocumentAsync
              (UriFactory.CreateDocumentUri(DatabaseId, CollectionId, id));
        }

        public void Save() { }

        public void Dispose() { }


    }
}
