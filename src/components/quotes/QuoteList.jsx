import { Fragment } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import QuoteItem from "./QuoteItem";
import classes from "./QuoteList.module.css";

function sortQuotes(quotes, ascending) {
  return quotes.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.id > quoteB.id ? 1 : -1;
    } else {
      return quoteA.id < quoteB.id ? 1 : -1;
    }
  });
}

const QuoteList = ({ quotes }) => {
  // const history = useHistory();
  const navigate = useNavigate();
  const location = useLocation();

  const queryPerms = new URLSearchParams(location.search);
  const isSortingAscending = queryPerms.get("sort") === "asc";

  const sortedQuotes = sortQuotes(quotes, isSortingAscending);

  function changeSortingHandler() {
    navigate(
      {
        pathname: location.pathname,
        search: `?sort=${isSortingAscending ? "desc" : "asc"}`,
      },
      { replace: true }
    );
    // history.push(
    //   `${location.pathname}?sort=${isSortingAscending ? "desc" : "asc"}`
    // );
  }

  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={changeSortingHandler}>
          Sort {isSortingAscending ? "Descending" : "Ascending"}
        </button>
      </div>
      <ul className={classes.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
