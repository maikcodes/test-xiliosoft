const getAllEmployees = async (companyName = "", bs = "", results = 5) => {
  try {
    const response = await fetch("https://jsonplaceholder.org/users");

    if (!response.ok) {
      throw new Error("Cannot access data");
    }

    const data = await response.json();

    if (companyName === "") {
      const result = data.slice(0, results);
      return result;
    }

    const filteredEmployees = data.filter((employee) => {
      return (
        (employee.company.name = companyName) && employee.company.bs === bs
      );
    });

    const result = filteredEmployees.slice(0, results);
    return result;
  } catch (error) {
    throw new Error("Cannot get the data");
  }
};

export default { getAllEmployees };
