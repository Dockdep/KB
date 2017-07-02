using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
interface IRepository<T,I> : IDisposable
        where T : class
{
    IEnumerable<T> GetAllList(); 
    Task<T> Details(I id);
    Task<IEnumerable<T>>  GetAllListWhere(Expression<Func<T, bool>> predicate);
    void Create(T item);
    void Update(I id, T item);
    void Delete(I id);

}