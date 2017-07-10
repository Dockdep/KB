using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DocumentDBGettingStarted.Models;
using DocumentDBGettingStarted.Services;
using DocumentDBGettingStarted.Repository;

namespace DocumentDBGettingStarted.Controllers
{

  public class ArticleController : Controller
  {
    private IRepository<Article, string> db;
    private IContentService dbService;
    private string user;
    public ArticleController()
    {
      db = new ArticleDocumentDBRepository();
      dbService = new ContentService();
      user = HttpContext.Session.GetString("user");
    }

    // GET: Subscriber
    public ActionResult Index()
    {
      try
      {
        return Json(db.GetAllListWhere(a=>a.SubscriberId == user).Result);
      }
      catch (Exception e)
      {
        return Json(e.Message);
      }
    }

    // GET: Subscriber/Details/5
    public ActionResult Details(string id)
    {
      try
      {
        return Json(db.Details(id).Result);

      }
      catch (Exception e)
      {
        return Json(e.Message);
      }
    }

    // POST: Subscriber/Create
    [HttpPost]
    public ActionResult Create([FromBody] Article collection)
    {
      try
      {
        dbService.AddArticle(collection, user);
        return Ok();

      }
      catch (Exception e)
      {
        return Json(e.Message);
      }
    }

    // POST: Subscriber/Edit/5
    [HttpPost]
    public ActionResult Edit(string id, [FromBody]  Article collection)
    {
      try
      {
        dbService.UpdateArticle(collection, user);
        return Ok();

      }
      catch (Exception e)
      {
        return Json(e.Message);
      }
    }

    // POST: Subscriber/Delete/5
    [HttpPost]
    public ActionResult Delete(string id)
    {
      try
      {
        dbService.DeleteArticle(id, user);
        return Ok();

      }
      catch (Exception e)
      {
          return Json(e.Message);
      }
    }
  }
}