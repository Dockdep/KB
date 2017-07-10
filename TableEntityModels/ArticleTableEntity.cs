using Newtonsoft.Json;
using Microsoft.WindowsAzure.Storage.Table;
namespace DocumentDBGettingStarted.TableEntityModels
{
    public partial class ArticleTableEntity : TableEntity
    {
        public static string DefaultPartitionKey { get; set; }

        [JsonProperty(PropertyName = "title")]
        public string Title { get; set; }

        [JsonProperty(PropertyName = "tagsId")]
        public string[] TagsId { get; set; }

        [JsonProperty(PropertyName = "subscriberId")]
        public string SubscriberId { get; set; }

        [JsonProperty(PropertyName = "ownerId")]
        public string OwnerId { get; set; }

        [JsonProperty(PropertyName = "dateCreated")]
        public string DateCreated { get; set; }

        [JsonProperty(PropertyName = "dateUpdated")]
        public string DateUpdated { get; set; }

        [JsonProperty(PropertyName = "datePublished")]
        public string DatePublished { get; set; }

        [JsonProperty(PropertyName = "content")]
        public string Content { get; set; }

        [IgnoreProperty]
        public string Id
        {
          get { return this.RowKey; }
          set { this.RowKey = value; }
        }
  }
}
