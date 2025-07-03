# WanderLens API Documentation

This document describes the available API endpoints for the WanderLens travel photo sharing platform.

## Base URL
- Development: `http://localhost:5000/api`
- Production: `https://your-domain.com/api`

## Travel Posts API

### GET /api/posts
Get all travel posts.

**Response:**
```json
[
  {
    "id": "1",
    "title": "Misty Mountains of Patagonia",
    "location": "Torres del Paine",
    "country": "Chile",
    "description": "A breathtaking journey through the misty peaks...",
    "story": "Waking up before dawn, I hiked through...",
    "images": [
      "https://images.unsplash.com/photo-1...",
      "https://images.unsplash.com/photo-2..."
    ],
    "coverImage": "https://images.unsplash.com/photo-...",
    "tags": ["mountains", "hiking", "nature"],
    "likes": 42,
    "date": "2024-03-15",
    "coordinates": {
      "lat": -50.9423,
      "lng": -73.4068
    },
    "isLiked": false
  }
]
```

### GET /api/posts/:id
Get a specific travel post by ID.

**Parameters:**
- `id` (string): The unique identifier of the post

**Response:**
```json
{
  "id": "1",
  "title": "Misty Mountains of Patagonia",
  "location": "Torres del Paine",
  "country": "Chile",
  "description": "A breathtaking journey through the misty peaks...",
  "story": "Waking up before dawn, I hiked through...",
  "images": ["..."],
  "coverImage": "...",
  "tags": ["mountains", "hiking", "nature"],
  "likes": 42,
  "date": "2024-03-15",
  "coordinates": {
    "lat": -50.9423,
    "lng": -73.4068
  },
  "isLiked": false
}
```

### POST /api/posts
Create a new travel post.

**Request Body:**
```json
{
  "title": "New Adventure",
  "location": "Location Name",
  "country": "Country Name",
  "description": "Brief description of the adventure",
  "story": "Detailed story of the journey",
  "images": [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg"
  ],
  "coverImage": "https://example.com/cover.jpg",
  "tags": ["adventure", "nature"],
  "likes": 0,
  "date": "2024-03-15",
  "coordinates": "{\"lat\": 40.7128, \"lng\": -74.0060}"
}
```

**Response:**
```json
{
  "id": "generated_id",
  "title": "New Adventure",
  // ... all fields from request
  "isLiked": false
}
```

### PUT /api/posts/:id
Update an existing travel post.

**Parameters:**
- `id` (string): The unique identifier of the post

**Request Body:** (all fields optional)
```json
{
  "title": "Updated Title",
  "description": "Updated description",
  "story": "Updated story",
  "tags": ["updated", "tags"],
  "likes": 50
}
```

### DELETE /api/posts/:id
Delete a travel post.

**Parameters:**
- `id` (string): The unique identifier of the post

**Response:** 204 No Content

### POST /api/posts/:id/like
Like a travel post (increments like count).

**Parameters:**
- `id` (string): The unique identifier of the post

**Response:**
```json
{
  "id": "1",
  // ... all post fields
  "likes": 43,
  "isLiked": true
}
```

### POST /api/posts/:id/unlike
Unlike a travel post (decrements like count).

**Parameters:**
- `id` (string): The unique identifier of the post

**Response:**
```json
{
  "id": "1",
  // ... all post fields
  "likes": 41,
  "isLiked": false
}
```

## Data Types

### TravelPost
```typescript
interface TravelPost {
  id: string;
  title: string;
  location: string;
  country: string;
  description: string;
  story: string;
  images: string[];
  coverImage: string;
  tags: string[];
  likes: number;
  date: string; // ISO date string
  coordinates?: {
    lat: number;
    lng: number;
  };
  isLiked: boolean; // For frontend use
}
```

## Error Responses

All endpoints return appropriate HTTP status codes:
- `200` - Success
- `201` - Created
- `204` - No Content
- `400` - Bad Request (invalid data)
- `404` - Not Found
- `500` - Internal Server Error

Error response format:
```json
{
  "error": "Error message describing what went wrong"
}
```

## Usage Examples

### Fetch all posts
```javascript
fetch('/api/posts')
  .then(response => response.json())
  .then(posts => console.log(posts));
```

### Create a new post
```javascript
fetch('/api/posts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: 'My Adventure',
    location: 'Somewhere Amazing',
    country: 'Country',
    description: 'Brief description',
    story: 'Full story here',
    images: ['image1.jpg'],
    coverImage: 'cover.jpg',
    tags: ['adventure'],
    likes: 0,
    date: '2024-03-15'
  })
})
.then(response => response.json())
.then(post => console.log(post));
```

### Like a post
```javascript
fetch('/api/posts/1/like', {
  method: 'POST'
})
.then(response => response.json())
.then(post => console.log(post));
```