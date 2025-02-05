# Multi-step Form Backend

Live Link : [multipage-form-backend.vercel.app](https://multipage-form-backend.vercel.app/)
### Tech stack
- NodeJS (ExpressJS)
- Javascript
- Neon Postgres DB

### Installation And Setup
```bash
git clone https://github.com/Aman-Singh-Kushwaha/multi-page-form

cd backend && pnpm install
```

Create your env
```env
NEON_DATABASE_URL =  
JWT_SECRET =
```

Create migrations for db schema to your db
``` bash
pnpm run migrate
```
Finally
```
pnpm run dev
```

## API Endpoints

#### Auth
- Signup: POST `/api/auth/signup`
- Login: POST `/api/auth/login`

#### Campaign
- Publish: POST `/api/campaign/publish`
  - Expected Request Body:
    ```json
    {
      "name": "Campaign Name",
      "objective": "Brand Awareness",
      "platform": "Platform Name",
      "targets": {
        "group_niche": "Tech Enthusiasts",
        "target_by_group": ["Selected Groups"],
        "location": "USA",
        "in_niche_tags": ["Innovation", "Startups"],
        "in_group_tags": ["Early Adopters", "Fit Club"]
      },
      "contents": {
        "content_text": "This is the campaign content...",
        "attachment_url": "http://example.com/media/image.jpg",
        "schedule_start": "2025-03-01T00:00:00Z",
        "schedule_end": "2025-03-31T23:59:59Z"
      },
      "bid": {
        "bid_ranges": [
          { "min_members": 100, "max_members": 500, "offer_amount": 50 },
          { "min_members": 501, "max_members": 1000, "offer_amount": 80 }
        ],
        "selected_groups": [
          { "group_id": 1, "offer_amount": 100 },
          { "group_id": 3, "offer_amount": 120 }
        ],
        "total_budget": 500
      }
    }
    ```
  - Response: 
    ```json
      {
        "message": "Campaign published successfully",
        "campaignId": 1
      }
    ```

#### Group
- Create Group: POST `/api/groups`
  - Request Body:
    ```json
    {
      "name": "Group Name",
      "admin_name": "Admin Name",
      "members_count": 100,
      "niches": ["Tech", "Gaming"],
      "channel_screenshot_url": "http://example.com/image.jpg",
      "image_date_updated": "2025-03-01T00:00:00Z"
    }
    ```
  - Response:
    ```json
    {
      "group": {
        "id": 1,
        "name": "Gr",
        "admin_name": "Admin Name",
        "members_count": 100,
        "niches": ["Tech", "Gaming"],
        "channel_screenshot_url": "http://example.com/image.jpg",
        "image_date_updated": "2025-03-01T00:00:00Z",
        "created_at": "timestamp"
      }
    }
    ```
- Get All Groups: GET `/api/groups`
  - Response:
    ```json
    {
      "groups": [
        {
          "id": 1,
          "name": "Delhi Fit Club",
          "admin_name": "Harsh Sharma",
          "members_count": 243,
          "niches": ["College", "Fitness", "IITians","Students"],
          "channel_screenshot_url": "http://example.com/image.jpg",
          "image_date_updated": "2025-03-01T00:00:00Z",
          "created_at": "timestamp"
        },
        {
          "id": 2,
          "name": "Group Name",
          "admin_name": "Admin Name",
          "members_count": 100,
          "niches": ["opted_niches"],
          "channel_screenshot_url": "http://example.com/image.jpg",
          "image_date_updated": "2025-03-01T00:00:00Z",
          "created_at": "timestamp"
        }
      ]
    }
    ```

### Database Schema
![Screenshot from 2025-02-05 04-50-09](https://github.com/user-attachments/assets/eed4f9ba-cf83-4272-a88c-7dbc1b239513)
