import QuoteForm from "../components/quotes/QuoteForm";
import { useEffect } from "react";
// import { useHistory } from "react-router";
import { useNavigate } from "react-router";
import useHttp from "../hooks/use-http";
import { addQuote } from "../lib/api";

function NewQuote() {
  // const history = useHistory();
  const navigate = useNavigate();
  const { sendRequest, status } = useHttp(addQuote);

  useEffect(() => {
    if (status === "completed") {
      navigate("/quotes");
    }
  }, [status, navigate]);

  function addQuoteHandler(quoteData) {
    sendRequest(quoteData);
  }

  return (
    <QuoteForm isLoading={status === "pending"} onAddQuote={addQuoteHandler} />
  );
}

export default NewQuote;
