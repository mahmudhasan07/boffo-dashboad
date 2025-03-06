import React from 'react';

const Loader = () => {
    return (
        <div className="w-full overflow-auto bg-white rounded-lg shadow-md animate-pulse">
            <table className="w-full mt-5 border-y">
                <thead className="border-b border-gray-200">
                    <tr>
                        <th className="px-4 py-4 first:pl-6 last:pr-6">
                            <div className="w-4 h-4 bg-gray-200 rounded"></div>
                        </th>
                        <th className="px-4 py-4 first:pl-6 last:pr-6">
                            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                        </th>
                        <th className="px-4 py-4 first:pl-6 last:pr-6">
                            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="px-4 py-4 first:pl-6">
                            <div className="h-4 bg-gray-200 rounded"></div>
                        </td>
                        <td className="px-4 py-4 first:pl-6">
                            <div className="h-4 bg-gray-200 rounded"></div>
                        </td>
                        <td className="px-4 py-4 first:pl-6 last:pr-6">
                            <div className="h-4 bg-gray-200 rounded"></div>
                        </td>
                    </tr>
                    <tr>
                        <td className="px-4 py-4 first:pl-6">
                            <div className="h-4 bg-gray-200 rounded"></div>
                        </td>
                        <td className="px-4 py-4 first:pl-6">
                            <div className="h-4 bg-gray-200 rounded"></div>
                        </td>
                        <td className="px-4 py-4 first:pl-6 last:pr-6">
                            <div className="h-4 bg-gray-200 rounded"></div>
                        </td>
                    </tr>
                    <tr>
                        <td className="px-4 py-4 first:pl-6">
                            <div className="h-4 bg-gray-200 rounded"></div>
                        </td>
                        <td className="px-4 py-4 first:pl-6">
                            <div className="h-4 bg-gray-200 rounded"></div>
                        </td>
                        <td className="px-4 py-4 first:pl-6 last:pr-6">
                            <div className="h-4 bg-gray-200 rounded"></div>
                        </td>
                    </tr>
                    <tr>
                        <td className="px-4 py-4 first:pl-6">
                            <div className="h-4 bg-gray-200 rounded"></div>
                        </td>
                        <td className="px-4 py-4 first:pl-6">
                            <div className="h-4 bg-gray-200 rounded"></div>
                        </td>
                        <td className="px-4 py-4 first:pl-6 last:pr-6">
                            <div className="h-4 bg-gray-200 rounded"></div>
                        </td>
                    </tr>
                    <tr>
                        <td className="px-4 py-4 first:pl-6">
                            <div className="h-4 bg-gray-200 rounded"></div>
                        </td>
                        <td className="px-4 py-4 first:pl-6">
                            <div className="h-4 bg-gray-200 rounded"></div>
                        </td>
                        <td className="px-4 py-4 first:pl-6 last:pr-6">
                            <div className="h-4 bg-gray-200 rounded"></div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Loader;