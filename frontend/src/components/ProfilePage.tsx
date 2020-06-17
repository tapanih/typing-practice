import React from 'react';
import ResultChart from './ResultChart';
import { ResultType } from '../../../backend/src/types';
import resultService from '../services/resultService';

const ProfilePage: React.FC = () => {
  const [results, setResults] = React.useState<ResultType[]>([]);

  React.useEffect(() => {
    const fetchResults = async () => {
      try {
        setResults(await resultService.getResults());
      } catch (e) {
        console.error("Error while fetching quote");
      }
    }
    fetchResults();
  }, []);

  return (
    <div className="container mx-auto h-full flex justify-center items-center">
      <div className="flex rounded bg-blue-100 max-w-4xl shadow-lg px-6 py-6 font-sans">
        <div className="flex-auto mr-4">
          <h1 className="text-lg mb-2">Last 10 results</h1>
          <table className="table-auto border text-sm">
            <thead className="bg-blue-200">
              <tr>
                <th className="px-4">#</th>
                <th className="px-4">Speed</th>
                <th className="px-4">Accuracy</th>
                <th className="px-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {results.slice(0, 10).map((result, index) =>
                <tr key={index} className={index % 2 === 0 ? "bg-blue-100" : "bg-blue-200"}>
                  <td className="px-4 pb-1">{index + 1}</td>
                  <td className="px-4 pb-1">{result.wpm} wpm</td>
                  <td className="px-4 pb-1">{result.accuracy} %</td>
                  <td className="px-4 pb-1">Some time ago</td>
                </tr>)}
            </tbody>
          </table>
        </div>
        <div className="flex-auto min-w-sm text-sm">
          
        <h1 className="text-lg mb-2">Speed progress</h1>
        {results.length > 0 && <ResultChart results={results} />}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;