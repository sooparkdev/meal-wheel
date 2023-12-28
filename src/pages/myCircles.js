import { useState } from "react";
import CircleForm from "@/components/CircleForm";

const MyCirclesPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleCreateCircle = () => {};

  return (
    <div>
      <button onClick={() => isFormOpen(true)}>Start a Circle</button>

      {isFormOpen && <CircleForm />}

      list all the currnet circles 
      when a circle is clicked on we should show a circle pop up or circle page...
    </div>
  );
};

export default MyCirclesPage;
