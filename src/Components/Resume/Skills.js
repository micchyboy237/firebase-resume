import React, { Component } from 'react';

class Skills extends Component {
  renderSkills(skills) {
    return skills.map((skill) => {
      const className = 'bar-expand ' + skill.name.toLowerCase();
      const width = `${skill.level}%`;

      return (
        <li key={skill.name}>
          <span style={{ width }} className={className}></span>
          <div className="details">
            <em>{skill.name}</em>
            <span
              className="level"
              style={{
                right: `${100 - skill.level}%`
              }}
            >
              {skill.level}%
            </span>
          </div>
        </li>
      );
    });
  }

  render() {
    const data = this.props.data;

    const skillCategories = data?.map(({ category, items }) => {
      return (
        <div key={category}>
          <p className="title">{category}</p>

          <div className="bars">
            <ul className="skills">{this.renderSkills(items)}</ul>
          </div>
        </div>
      );
    });

    return (
      <div className="row skill">
        <div className="three columns header-col">
          <h1>
            <span>Skills</span>
          </h1>
        </div>

        <div className="nine columns main-col">
          <div className="categories">{skillCategories}</div>
        </div>
      </div>
    );
  }
}

export default Skills;
