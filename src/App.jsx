import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import NewQuote from "./pages/NewQuote";
import QuoteDetail from "./pages/QuoteDetail";
import Layout from "./components/layout/Layout";
import AllQuotes from "./pages/AllQuotes";
import NotFound from "./pages/NotFound";
import Comments from "./components/comments/Comments";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' exact element={<Navigate replace to='/quotes' />} />
        <Route path='/quotes' exact element={<AllQuotes />} />
        <Route path='/quotes/:quoteId/*' element={<QuoteDetail />}>
          <Route path={`comments`} element={<Comments />} />
        </Route>
        <Route path='/new-quote' element={<NewQuote />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
