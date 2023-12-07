const getAllEmployees = async (
  companyName = "",
  bs = "Technology",
  results = 5
) => {
  try {
    const response = await fetch("https://jsonplaceholder.org/users");

    if (!response.ok) {
      throw new Error("Cannot access data");
    }

    const data = await response.json();

    if (companyName !== "" && bs === "") {
      const filteredResults = data.filter(
        (employee) => employee.company.name === companyName
      );
      return filteredResults.slice(0, results);
    }

    if (companyName === "" && bs !== "") {
      const filteredResults = data.filter(
        (employee) => employee.company.bs === bs
      );
      return filteredResults.slice(0, results);
    }

    if (companyName === "" && bs === "") {
      return data.slice(0, results);
    }

    return data.slice(0, results);
  } catch (error) {
    throw new Error("Cannot get the data");
  }
};

export default { getAllEmployees };
