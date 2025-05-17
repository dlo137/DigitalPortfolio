import React, { useEffect, useState } from 'react';
import './ProjectGrid.css';

const GITHUB_USERNAME = 'dlo137'; // <-- Change to your GitHub username

// Map repo names to screenshot image paths
const repoScreenshots = {
  'FlaskReactWeatherApp': process.env.PUBLIC_URL + '/assets/FlaskReactWeatherApp.png',
  'react-weather-app': process.env.PUBLIC_URL + '/assets/ReactWeatherApp.png',
};

const ProjectGrid = () => {
    const [repos, setRepos] = useState([]);

    useEffect(() => {
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=created&direction=desc`)
            .then(res => res.json())
            .then(data => {
                setRepos(data.slice(2 , 7));
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
                        src={repoScreenshots[repo.name]}
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