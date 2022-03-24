import http from '@/http-common';

class TutorialDataService {
  getAll(): Promise<any> {
    return http.get('/tutorials');
  }

  get(id: any): Promise<any> {
    return http.get(`/tutorials/${id}`);
  }

  findByTitle(title: string): Promise<any> {
    return http.get(`/tutorials?title=${title}`);
  }
}
export default new TutorialDataService();
