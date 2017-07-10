using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DocumentDBGettingStarted.Models;
namespace DocumentDBGettingStarted.Services
{
    interface IContentService
    {

      //Add new article into storage
      void AddArticle(Article article, string accountId);

      //Update article in storage and add new ArticleHistory record.Increment VersionNum and 
      //set current time for Timestamp field. Set "ModifiedBy" field to the account ID passed in parameter
      void UpdateArticle(Article article, string accountId);


      //Change article's satate to Article.Deleted
      void DeleteArticle(string articleId, string accountId);

    }
}
