import { useState } from "react";
import { PiLinkBold } from "react-icons/pi";
import axios from "../config/axios";
const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState(null);

  function createProject(event) {
    event.preventDefault();
    console.log("create project:", projectName);

    axios
      .post("/projects/create", {
        name: projectName,
      })
      .then((res) => {
        console.log(res);
        setIsModalOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <main className="p-4">
      <div className="projects">
        <button
          onClick={() => setIsModalOpen(true)}
          className="ackdrop-blur-lg shadow-2xl  project p-4 border-2 border-slate-600 rounded-lg transform transition-transform duration-300 hover:scale-110 flex gap-2 mt-2 "
        >
          <p className="font-bold text-slate-800 hover:transform-3d">
            New Project
          </p>

          <PiLinkBold className="mt-1" />
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md w-1/3">
            <h2 className="text-xl mb-4">Create New Project</h2>
            <form onSubmit={createProject}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Project Name
                </label>
                <input
                  onChange={(e) => setProjectName(e.target.value)}
                  value={projectName}
                  type="text"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="mr-2 px-4 py-2 bg-gray-300 rounded-md"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-600 text-white rounded-md"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;
