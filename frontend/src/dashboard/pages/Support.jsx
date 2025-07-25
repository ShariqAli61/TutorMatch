// function Support() {
//     return <div className="text-center mt-10">Support & Help Center.</div>;
//   }
  
//   export default Support;



import { useState } from "react";

export default function Support() {
  const [ticketMessage, setTicketMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitTicket = () => {
    if (ticketMessage.trim() !== "") {
      setSubmitted(true);
      setTicketMessage("");
    }
  };

  const faqs = [
    { question: "How to find a teacher?", answer: "Use the search and filter features on the platform." },
    { question: "How do payments work?", answer: "Parents pay securely; teachers withdraw earnings after classes." },
    { question: "How to reschedule a class?", answer: "Go to Assigned Teacher and request reschedule." },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Support & FAQs</h1>

      {/* FAQs */}
      <div className="mb-8">
        {faqs.map((faq, i) => (
          <div key={i} className="mb-4">
            <h2 className="font-semibold">{faq.question}</h2>
            <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
          </div>
        ))}
      </div>

      {/* Raise Ticket */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Raise a Support Ticket</h2>
        {submitted ? (
          <p className="text-green-500">✅ Your support ticket has been submitted!</p>
        ) : (
          <>
            <textarea
              value={ticketMessage}
              onChange={(e) => setTicketMessage(e.target.value)}
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white mb-4"
              placeholder="Describe your issue..."
            />
            <button onClick={handleSubmitTicket} className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
              Submit Ticket
            </button>
          </>
        )}
      </div>
    </div>
  );
}
