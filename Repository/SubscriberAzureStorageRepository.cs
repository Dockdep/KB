using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DocumentDBGettingStarted.TableEntityModels;
using System.Linq.Expressions;
using Microsoft.WindowsAzure.Storage.Table;

namespace DocumentDBGettingStarted.Repository
{
  public class SubscriberAzureStorageRepository : IRepository<SubscriberTableEntity,string>
  {
    private TableStorageService<SubscriberTableEntity> dataTable = new TableStorageService<SubscriberTableEntity>("SubscriberTableEntity");

    public IEnumerable<SubscriberTableEntity> GetAllList()
    {
      try
      {
        return dataTable.GetEntitiesByFilterAsync().Result;
      }
      catch (Exception e)
      {
        throw new Exception(e.Message);
      }
    }

    public async Task<IEnumerable<SubscriberTableEntity>> GetAllListWhere()
    {
  
      return await GetAllListWhere((s)=>true);
    }

    public Task<IEnumerable<SubscriberTableEntity>> GetAllListWhere(Expression<Func<SubscriberTableEntity, bool>> filter)
    {
      IQueryable<SubscriberTableEntity> data = dataTable.GetEntitiesByFilterAsync().Result.AsQueryable();
      return Task.Run(() =>
      {
        return data.Where(filter).AsEnumerable();
      });
     
    }

    public async Task<SubscriberTableEntity> Details(string id)
    {
      try
      {
        return await dataTable.GetEntityByKeysAsync(SubscriberTableEntity.DefaultPartitionKey, id);
      }
      catch (Exception e)
      {
        throw new Exception(e.Message);
      }
    }

    public async void Create(SubscriberTableEntity data)
    {
      try
      {

        SubscriberTableEntity result = await dataTable.InsertOrMergeEntityAsync(data);
       
      }
      catch (Exception e)
      {
        throw new Exception(e.Message);
      }
    }

    public async void Update(string Id, SubscriberTableEntity data)
    {
      try
      {
        await dataTable.InsertOrMergeEntityAsync(data);
      }
      catch (Exception e)
      {
        throw new Exception(e.Message);
      }
    }

    public async void Delete(string id)
    {
      SubscriberTableEntity data = await dataTable.GetEntityByKeysAsync(SubscriberTableEntity.DefaultPartitionKey, id);
      await dataTable.DeleteEntityAsync(data);
    }



    public void Save() { }

    public void Dispose() { }
  }
}
