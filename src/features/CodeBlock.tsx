import React, { useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-okaidia.css'; // You can choose another theme
import 'prismjs/components/prism-python';

const CodeBlock = ({ code, language }:{code: string; language: string;}) => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    alert('Code copied to clipboard!');
  };

  return (
    <div className="code-block-wrapper">
      {/* Top Bar */}
      <div className="code-block-header">
        <span>{language}</span>
        <button className="copy-button" onClick={copyToClipboard}>
          Copy
        </button>
      </div>

      {/* Code Block */}
      <div className="code-block">
        <pre>
          <code className={`language-${language}`}>
            {code}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;
