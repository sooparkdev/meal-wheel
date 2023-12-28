const CircleForm = () => {
  const [formData, setFormData] = useState({
    groupName: "",
    description: "",
    memberLimit: "", // int
    neighborhood: "",
    cuisineType: "",
    dietaryAccommodations: [],
    costSharingArrangement: "",
  });

  const neighborhoods = ["Neighborhood 1", "Neighborhood 2", "Neighborhood 3"]; // Replace with actual neighborhoods
  const costSharingOptions = [
    "Split equally",
    "Host covers cost",
    "Guest contributes a fixed amount",
  ];
  const dietaryOptions = [
    "Vegetarian-Friendly",
    "Vegan-Friendly",
    "Gluten-Free Options",
    "Nut-Free Environment",
    "Halal/Kosher Options",
    "Dairy-Free Choices",
    "Low-Carb/Low-Sugar",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        dietaryAccommodations: checked
          ? [...prevFormData.dietaryAccommodations, value]
          : prevFormData.dietaryAccommodations.filter((item) => item !== value),
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission logic here
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="groupName"
        type="text"
        placeholder="Group Name"
        value={formData.groupName}
        onChange={handleChange}
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />
      <input
        name="memberLimit"
        type="number"
        placeholder="Member Limit"
        value={formData.memberLimit}
        onChange={handleChange}
      />
      <select
        name="neighborhood"
        value={formData.neighborhood}
        onChange={handleChange}
      >
        {neighborhoods.map((n) => (
          <option key={n} value={n}>
            {n}
          </option>
        ))}
      </select>
      <input
        name="cuisineType"
        type="text"
        placeholder="Typical Cuisine Type"
        value={formData.cuisineType}
        onChange={handleChange}
      />
      <fieldset>
        <legend>Dietary Accommodations</legend>
        {dietaryOptions.map((option) => (
          <label key={option}>
            <input
              type="checkbox"
              name="dietaryAccommodations"
              value={option}
              checked={formData.dietaryAccommodations.includes(option)}
              onChange={handleChange}
            />
            {option}
          </label>
        ))}
      </fieldset>
      <select
        name="costSharingArrangement"
        value={formData.costSharingArrangement}
        onChange={handleChange}
      >
        {costSharingOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CircleForm;
