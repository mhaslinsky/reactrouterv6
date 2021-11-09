import React from "react";
import { Route, Routes, useLocation, useParams } from "react-router";
// import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import NoQuotesFound from "../components/quotes/NoQuotesFound";
import { Link, Outlet } from "react-router-dom";
import { getSingleQuote } from "../lib/api";
import useHttp from "../hooks/use-http";
import { useEffect } from "react";
import LoadingSpinner from "../components/UI/LoadingSpinner";

function QuoteDetail() {
  const params = useParams();
  const loc = useLocation();

  const { quoteId } = params;

  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getSingleQuote, true);

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if (status === "pending") {
    return (
      <div className='centered'>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className='centered focused'>{error}</p>;
  }

  if (!loadedQuote.text) {
    return <NoQuotesFound />;
  }

  return (
    <React.Fragment>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      <Routes>
        <Route
          path=''
          element={
            <div className='centered'>
              <Link className='btn--flat' to={`${loc.pathname}/comments`}>
                Expand Comments
              </Link>
            </div>
          }
        />
        {/* <Route path={`comments`} element={<Comments />} /> */}
      </Routes>
      <Outlet />
    </React.Fragment>
  );
}

export default QuoteDetail;
