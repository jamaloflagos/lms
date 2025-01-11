const Pagination = ({ totalQuestions, questionsPerPage, paginate, currentPage }) => {
    const pageNumbers = [];
    const nPage = Math.ceil(totalQuestions / questionsPerPage);
  
    for(let i = 1; i <= nPage; i++) {
      pageNumbers.push(i);
    }
    
    const prev = () => {
      if(currentPage > 1) {
        paginate(currentPage - 1);
      }
    }
    
    const next = () => {
      if(currentPage < nPage) {
        paginate(currentPage + 1);
      }
    }
    
    return (
      <nav>
        <ul>
          {currentPage > 1 && <button onClick={prev}>Prev</button>}
          {
            pageNumbers.map(number => (
              <li key={number} style={{display: 'inline'}}>
                <button 
                  onClick={() => paginate(number)}
                  style={{ fontWeight: currentPage === number ? 'bold' : 'normal' }}
                >
                  {number}
                </button>
              </li>
            ))
          }
          {currentPage < totalQuestions && <button onClick={next}>Next</button>}
        </ul>
      </nav>
    );
  }
  
  export default Pagination;
  