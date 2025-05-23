import React, { useEffect, useState } from 'react';
import './ProjectGrid.css';

const GITHUB_USERNAME = 'dlo137'; // <-- Change to your GitHub username

// Map repo names to screenshot image paths
const repoScreenshots = {
  'FlaskReactWeatherApp': process.env.PUBLIC_URL + '/assets/FlaskReactWeatherApp.png',
  'react-weather-app': process.env.PUBLIC_URL + '/assets/ReactWeatherApp.png',
  'Admin-Dashboard-Hosting': process.env.PUBLIC_URL + '/assets/Admin-Dashboard-Hosting.png',
  'Nike-E-Commerce-Page': process.env.PUBLIC_URL + '/assets/Nike-E-Commerce-Page.png',
  'Crypto-Currency-Tracker': process.env.PUBLIC_URL + '/assets/Crypto-Currency-Tracker.png',
};

const ProjectGrid = () => {
    const [repos, setRepos] = useState([]);

    useEffect(() => {
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&direction=desc&per_page=100`)
            .then(res => res.json())
            .then(data => {
                console.log(data); // <-- Add this line
                setRepos([data[2], data[3], data[26], data[29], data[31]]);
            });
    }, []);

    return (
        <div className="project-grid-container">
            {repos.map((repo, idx) => (
                <a
                    key={repo.id}
                    className={`project-item project-item-${idx + 1}`}
                    href={`https://${GITHUB_USERNAME}.github.io/${repo.name}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {/* Show screenshot if available */}
                    {repoScreenshots[repo.name] && (
                        <img
                        src={repoScreenshots[repo.name] || process.env.PUBLIC_URL + '/assets/placeholder.png'}
                        alt={repo.name}
                        className="project-screenshot"
                        />
                    )}
                    <div className="project-title-overlay">
                        <h2>{repo.name}</h2>
                    </div>
                </a>
            ))}
        </div>
    );
};

export default ProjectGrid;