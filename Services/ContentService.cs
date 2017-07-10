using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DocumentDBGettingStarted.Models;
using DocumentDBGettingStarted.Repository;
namespace DocumentDBGettingStarted.Services
{
  public class ContentService : IContentService
  {
    public void AddArticle(Article article, string accountId)
    {
      ArticleDocumentDBRepository ArticleRepository = new ArticleDocumentDBRepository();
      article.DateCreated = DateTime.Now.ToString("HH:mm:ss dd.MM.yyyy");
      article.State = Article.New;
      article.OwnerId = accountId;
      article.SubscriberId = accountId;
      ArticleRepository.Create(article);
    }

    public async void UpdateArticle(Article article, string accountId)
    {

      ArticleDocumentDBRepository ArticleRepository = new ArticleDocumentDBRepository();
      Article OldVersion = await ArticleRepository.Details(article.Id);
  

      article.DateUpdated = DateTime.Now.ToString("HH:mm:ss dd.MM.yyyy");
      ArticleRepository.Update(article.Id, article);

      ArticleHistoryDocumentDBRepository ArticleHistoryRepository = new ArticleHistoryDocumentDBRepository();
      ArticleHistory ArticleHistory = ArticleHistoryRepository.GetAllListWhere(f => f.ArticleId == article.Id).Result.FirstOrDefault();
      ArticleHistory newHistory;
      if (ArticleHistory != null)
      {
         newHistory = SetHistory(ArticleHistory.VersionNum + 1, OldVersion, accountId);
      }
      else
      {
         newHistory = SetHistory(1, OldVersion, accountId);
      }
      ArticleHistoryRepository.Create(newHistory);
    }


    public async void DeleteArticle(string articleId, string accountId)
    {
      ArticleDocumentDBRepository ArticleRepository = new ArticleDocumentDBRepository();
      Article OldVersion = await ArticleRepository.Details(articleId);

      OldVersion.State = Article.Deleted;
      ArticleRepository.Update(articleId, OldVersion);

      ArticleHistoryDocumentDBRepository ArticleHistoryRepository = new ArticleHistoryDocumentDBRepository();
      ArticleHistory ArticleHistory = ArticleHistoryRepository.GetAllListWhere(f => f.ArticleId == articleId).Result.FirstOrDefault();
      ArticleHistory newHistory;
      if (ArticleHistory != null)
      {
        newHistory = SetHistory(ArticleHistory.VersionNum + 1, OldVersion, accountId);
      }
      else
      {
        newHistory = SetHistory(1, OldVersion, accountId);
      }
      ArticleHistoryRepository.Create(newHistory);
    }

    private ArticleHistory SetHistory(int versionNum, Article article, string userId)
    {

      ArticleHistory articleHistory = new ArticleHistory()
      {
        VersionNum = versionNum,
        TagsOld = article.TagsId,
        ContentOld = article.Content,
        StateOld = article.State,
        ModifiedBy = userId,
        Timestamp = DateTime.Now.ToString("HH:mm:ss dd.MM.yyyy")
      };
      return articleHistory;
    }
  }
}
