import { useState } from "react";
import CircleFormModal from "@/components/CircleFormModal";

const MyCirclesPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleCreateCircle = () => {};

  return (
    <div>
      <button onClick={() => setIsFormOpen(true)}>Start a Circle</button>

      {isFormOpen && <CircleFormModal onClose={() => setIsFormOpen(false)}/>}

      list all the currnet circles 
      when a circle is clicked on we should show a circle pop up or circle page...
    </div>
  );
};

export default MyCirclesPage;
