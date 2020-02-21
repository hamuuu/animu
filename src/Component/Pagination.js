import React from 'react';

class Pagination extends React.Component {

  render() {
    const pageNumber = []
    for (let i = 1; i < Math.ceil(this.props.totalPost / this.props.postPerPage) + 1 ; i++) {
      pageNumber.push(i)
    }
    return (
      <nav>
        <hr/>
        <ul className="pagination justify-content-center">
          {pageNumber.map(number => (
            <li key={number} className={number === this.props.currentPage ? 'page-item active' : 'page-item'}>
              <a onClick={() => this.props.paginate(number)} href="#new-episode" className="page-link">{number}</a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

export default Pagination;
