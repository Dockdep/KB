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
  public class ArticleHistoryDocumentDBRepository : IRepository<ArticleHistory,string>
  {
    private const string EndpointUri = "https://single-page-aplication.documents.azure.com:443/";
    private const string PrimaryKey = "Up4bHXTTlUGw7MkB1C1qCg8QX1zDxdzbfWtCZzpNbVfsJ7nU6ShaThFNQxTUUHFt04sya1pEaMsLDtAq0vNHig==";
    private static readonly string DatabaseId = "KnowledgeBase";
    private static readonly string CollectionId = "ArticleHistory";
    private DocumentClient _client;

    public ArticleHistoryDocumentDBRepository()
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

    public IEnumerable<ArticleHistory> GetAllList()
    {
        try
        {
            FeedOptions queryOptions = new FeedOptions { MaxItemCount = -1 };
            IQueryable<ArticleHistory> results = _client.CreateDocumentQuery<ArticleHistory>(
                    UriFactory.CreateDocumentCollectionUri(DatabaseId, CollectionId), queryOptions);

            return results.ToList();

        }
        catch (Exception e)
        {
            throw new Exception(e.Message);
        }

    }

    public async Task<IEnumerable<ArticleHistory>> GetAllListWhere()
    {
      return await GetAllListWhere((s) => true);
    }

    public async Task<IEnumerable<ArticleHistory>> GetAllListWhere(Expression<Func<ArticleHistory, bool>> predicate)
    {
      IDocumentQuery<ArticleHistory> query = _client.CreateDocumentQuery<ArticleHistory>(
          UriFactory.CreateDocumentCollectionUri(DatabaseId, CollectionId))
          .Where(predicate)
          .AsDocumentQuery();

      List<ArticleHistory> results = new List<ArticleHistory>();
      while (query.HasMoreResults)
      {
        results.AddRange(await query.ExecuteNextAsync<ArticleHistory>());
      }

      return results;
    }

    public async Task<ArticleHistory> Details(string id)
    {
        try
        {
            var result = await _client.ReadDocumentAsync
            (UriFactory.CreateDocumentUri(DatabaseId, CollectionId, id));
            return (ArticleHistory)(dynamic)result.Resource;
        }
        catch (Exception e)
        {
            throw new Exception(e.Message);
        }
    }

    public void Create(ArticleHistory data)
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

    public void Update(string Id, ArticleHistory data)
    {
        _client.ReplaceDocumentAsync
            (UriFactory.CreateDocumentUri(DatabaseId, CollectionId, Id), data);
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
