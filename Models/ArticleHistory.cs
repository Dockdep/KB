using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
namespace DocumentDBGettingStarted.Models
{
  public class ArticleHistory
  {

    [JsonProperty(PropertyName = "id")]
    public string Id { get; set; }

    [JsonProperty(PropertyName = "articleId")]
    public string ArticleId { get; set;  }

    [JsonProperty(PropertyName = "versionNum")]
    public int VersionNum { get; set;  }

    [JsonProperty(PropertyName = "timestamp")]
    public string Timestamp { get; set;  }

    [JsonProperty(PropertyName = "modifiedBy")]
    public string ModifiedBy { get; set;  }

    [JsonProperty(PropertyName = "content")]
    public string ContentOld { get; set;  }

    [JsonProperty(PropertyName = "tags")]
    public string[] TagsOld { get; set; }

    [JsonProperty(PropertyName = "state")]
    public int StateOld { get; set; }
  }
}
