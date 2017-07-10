using Newtonsoft.Json;
using Microsoft.WindowsAzure.Storage.Table;
namespace DocumentDBGettingStarted.TableEntityModels
{
    public partial class TagTableEntity : TableEntity
  {
        public static string DefaultPartitionKey { get; set; }

        [JsonProperty(PropertyName = "parentId")]
        public string ParentId { get; set; }

        [JsonProperty(PropertyName = "subscriberId")]
        public string SubscriberId { get; set; }

        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }

        [IgnoreProperty]
        public string Id
        {
          get { return this.RowKey; }
          set { this.RowKey = value; }
        }
    }
}
