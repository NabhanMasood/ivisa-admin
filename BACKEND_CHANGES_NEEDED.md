# Backend Changes Needed for Guides Feature

## Required Backend Endpoint

You need to create a new endpoint for uploading guide images to Cloudinary, similar to how country flags are uploaded.

### Endpoint: `POST /guides/upload`

**Request:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body: FormData with field name `image` containing the image file

**Response:**
```json
{
  "status": true,
  "message": "Image uploaded successfully",
  "data": {
    "imageUrl": "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/guide-image.jpg",
    // OR any of these field names will work:
    // "url": "...",
    // "cloudinaryUrl": "..."
  }
}
```

**Error Response:**
```json
{
  "status": false,
  "message": "Error message here"
}
```

### Implementation Notes:

1. **File Validation:**
   - Accept only image files (image/*)
   - Maximum file size: 5MB
   - Supported formats: JPG, PNG, GIF, WebP

2. **Cloudinary Upload:**
   - Use the same Cloudinary configuration as the country flags upload
   - Upload to a folder like `guides/` or `guides/images/`
   - Return the full Cloudinary URL

3. **Example Implementation (NestJS):**
```typescript
@Post('upload')
@UseInterceptors(FileInterceptor('image'))
async uploadGuideImage(@UploadedFile() file: Express.Multer.File) {
  // Validate file
  if (!file) {
    throw new BadRequestException('No file provided');
  }
  
  if (!file.mimetype.startsWith('image/')) {
    throw new BadRequestException('File must be an image');
  }
  
  if (file.size > 5 * 1024 * 1024) {
    throw new BadRequestException('File size must be less than 5MB');
  }
  
  // Upload to Cloudinary (similar to country upload)
  const result = await this.cloudinaryService.uploadFile(file, 'guides/');
  
  return {
    status: true,
    message: 'Image uploaded successfully',
    data: {
      imageUrl: result.secure_url,
      // Also support these field names for compatibility:
      url: result.secure_url,
      cloudinaryUrl: result.secure_url,
    },
  };
}
```

## Optional: Update Guide Entity

If you want to remove author fields from the database entity (optional, but recommended):

1. Remove from `Guide` entity:
   - `author` (string)
   - `authorImage` (string)
   - `authorBio` (string)
   - `metaTags` (string)

2. Update DTOs:
   - Remove author fields from `CreateGuideDto`
   - Remove author fields from `UpdateGuideDto`

3. Update Service:
   - Remove author field validation/requirements
   - Remove author field assignments

**Note:** If you keep these fields in the database but just don't use them in the frontend, that's fine too. The frontend will simply ignore them.

## Summary

**Required:**
- ✅ Create `POST /guides/upload` endpoint for image uploads

**Optional:**
- ⚠️ Remove author and metaTags fields from Guide entity (if you want to clean up the database schema)

The frontend is now ready and will work once you add the upload endpoint!

