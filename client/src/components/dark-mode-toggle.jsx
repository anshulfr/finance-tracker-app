export const DarkModeToggle = ({ darkMode, toggleDarkMode }) => {
    return (
        <button onClick={toggleDarkMode} className="pr-3 pt-1">
            {darkMode ?
                <img width="30" height="30" src="https://i.imgur.com/X4zOjfJ.png" /> :
                <img width="30" height="30" src="https://i.imgur.com/4mmE3Rc.png" />
            }
        </button>
    );
}
