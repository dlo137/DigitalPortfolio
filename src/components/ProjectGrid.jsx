import './ProjectGrid.css';

const ProjectGrid = () => {
    return (
        <div className="project-grid-container">
            <div className="project-item project-item-1">
                <h2>Project 1</h2>
                <p>Description of project 1.</p>
            </div>
            <div className="project-item project-item-2">
                <h2>Project 2</h2>
                <p>Description of project 2.</p>
            </div>
            <div className="project-item project-item-3">
                <h2>Project 3</h2>
                <p>Description of project 3.</p>
            </div>
            <div className="project-item project-item-4">
                <h2>Project 4</h2>
                <p>Description of project 4.</p>
            </div>
            <div className="project-item project-item-5">
                <h2>Project 5</h2>
                <p>Description of project 5.</p>
            </div>
        </div>
    );
}

export default ProjectGrid;