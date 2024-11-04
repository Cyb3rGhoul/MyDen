import React, { useState } from 'react';
import { Button, TextField, Select, MenuItem, IconButton } from '@mui/material';
import { Copy, Plus, X } from 'lucide-react';

const LinkManager = () => {
  const [categories, setCategories] = useState([
    { id: '1', name: 'GitHub', links: [] },
    { id: '2', name: 'Social', links: [] }
  ]);
  const [newCategory, setNewCategory] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [newLink, setNewLink] = useState({ title: '', url: '' });

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      setCategories([...categories, { 
        id: Date.now().toString(), 
        name: newCategory, 
        links: [] 
      }]);
      setNewCategory('');
    }
  };

  const handleAddLink = () => {
    if (selectedCategory && newLink.title && newLink.url) {
      setCategories(categories.map(cat => 
        cat.id === selectedCategory
          ? { ...cat, links: [...cat.links, { ...newLink, id: Date.now().toString() }] }
          : cat
      ));
      setNewLink({ title: '', url: '' });
    }
  };

  const handleCopyLink = (url) => {
    navigator.clipboard.writeText(url);
    // You could add a toast notification here
  };

  const handleDeleteLink = (categoryId, linkId) => {
    setCategories(categories.map(cat =>
      cat.id === categoryId
        ? { ...cat, links: cat.links.filter(link => link.id !== linkId) }
        : cat
    ));
  };

  const handleDeleteCategory = (categoryId) => {
    setCategories(categories.filter(cat => cat.id !== categoryId));
  };

  return (
    <div className="card link-manager">
      <h2>Link Manager</h2>
      
      {/* Add Category */}
      <div className="add-category-form">
        <TextField
          size="small"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="New Category"
          className="category-input"
        />
        <Button 
          onClick={handleAddCategory}
          variant="contained"
          startIcon={<Plus size={16} />}
        >
          Add Category
        </Button>
      </div>

      {/* Add Link */}
      <div className="add-link-form">
        <Select
          size="small"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="category-select"
        >
          {categories.map(cat => (
            <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
          ))}
        </Select>
        <TextField
          size="small"
          value={newLink.title}
          onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
          placeholder="Link Title"
          className="link-input"
        />
        <TextField
          size="small"
          value={newLink.url}
          onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
          placeholder="URL"
          className="link-input"
        />
        <Button 
          onClick={handleAddLink}
          variant="contained"
          startIcon={<Plus size={16} />}
        >
          Add Link
        </Button>
      </div>

      {/* Categories and Links */}
      <div className="categories-container">
        {categories.map(category => (
          <div key={category.id} className="category-section">
            <div className="category-header">
              <h3>{category.name}</h3>
              <IconButton 
                onClick={() => handleDeleteCategory(category.id)}
                size="small"
              >
                <X size={16} />
              </IconButton>
            </div>
            <div className="links-list">
              {category.links.map(link => (
                <div key={link.id} className="link-item">
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.title}
                  </a>
                  <div className="link-actions">
                    <IconButton
                      onClick={() => handleCopyLink(link.url)}
                      size="small"
                    >
                      <Copy size={16} />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDeleteLink(category.id, link.id)}
                      size="small"
                    >
                      <X size={16} />
                    </IconButton>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LinkManager;