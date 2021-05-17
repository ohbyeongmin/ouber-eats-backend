import { Test } from '@nestjs/testing';
import got from 'got';
import * as FormData from 'form-data';
import { CONFIG_OPTIONS } from 'src/common/common.contants';
import { MailService } from './mail.service';

jest.mock('got');
jest.mock('form-data');

const TEST_DOMAIN = 'test-domain';

describe('MailService', () => {
  let service: MailService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        MailService,
        {
          provide: CONFIG_OPTIONS,
          useValue: {
            apiKey: 'test-apiKey',
            domain: TEST_DOMAIN,
            fromEmail: 'test-fromEmail',
          },
        },
      ],
    }).compile();
    service = module.get<MailService>(MailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sendVerificationEamil', () => {
    it('should call sendEmail', () => {
      const sendVerificationEamilArgs = {
        email: 'email',
        to: 'to',
        code: 'code',
      };
      jest.spyOn(service, 'sendEmail').mockImplementation(async () => true);
      service.sendVerificationEamil(
        sendVerificationEamilArgs.email,
        sendVerificationEamilArgs.to,
        sendVerificationEamilArgs.code,
      );
      expect(service.sendEmail).toHaveBeenCalledTimes(1);
      expect(service.sendEmail).toHaveBeenCalledWith(
        'Verify Your Email',
        sendVerificationEamilArgs.to,
        'ouber_eats',
        [
          { key: 'code', value: sendVerificationEamilArgs.code },
          { key: 'username', value: sendVerificationEamilArgs.email },
        ],
      );
    });
  });

  describe('sendEmail', () => {
    it('sends email', async () => {
      const ok = await service.sendEmail('', '', '', []);
      const formSpy = jest.spyOn(FormData.prototype, 'append');
      expect(formSpy).toHaveBeenCalled();
      expect(got.post).toHaveBeenCalledTimes(1);
      expect(got.post).toHaveBeenCalledWith(
        `https://api.mailgun.net/v3/${TEST_DOMAIN}/messages`,
        expect.any(Object),
      );
      expect(ok).toEqual(true);
    });

    it('fails on error', async () => {
      jest.spyOn(got, 'post').mockImplementation(() => {
        throw new Error();
      });
      const ok = await service.sendEmail('', '', '', []);
      expect(ok).toEqual(false);
    });
  });
});
