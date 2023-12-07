const baseUrl = "http://192.168.0.134:3001/task";

export class TaskServices {
  static async getAll() {
    try {
      const tasks = await fetch(baseUrl).then((res) => res.json());
      return tasks;
    } catch (error) {
      throw new Error("Cannot get tasks data");
    }
  }

  static async save(task) {
    try {
      if (task.id === "") {
        const newTask = {
          ...task,
          status: "incomplete",
        };
        await fetch(baseUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTask),
        });
        return;
      }

      const urlToSave = `${baseUrl}/${task.id}`;
      await fetch(urlToSave, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });
      //   return tasks.json();
    } catch (error) {
      throw new Error("Cannot save tasks data", error);
    }
  }

  static async delete({ taskId }) {
    try {
      const urlToDelete = `${baseUrl}/${taskId}`;
      await fetch(urlToDelete, {
        method: "DELETE",
      });
    } catch (error) {
      throw new Error("Cannot delete tasks", error);
    }
  }
}
