using Amazon.Comprehend;
using Amazon.Comprehend.Model;
using Amazon.LexRuntimeV2;
using Amazon.LexRuntimeV2.Model;
using Amazon.Rekognition;
using Amazon.Rekognition.Model;
using Amazon.TranscribeService;
using Amazon.TranscribeService.Model;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Namespace0001.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PredictController : ControllerBase
    {
        private readonly AmazonRekognitionClient _rekognitionClient;
        private readonly AmazonTranscribeServiceClient _transcribeClient;
        private readonly AmazonComprehendClient _comprehendClient;
        private readonly AmazonLexRuntimeV2Client _lexClient;

        public PredictController(
            AmazonRekognitionClient rekognitionClient,
            AmazonTranscribeServiceClient transcribeClient,
            AmazonComprehendClient comprehendClient,
            AmazonLexRuntimeV2Client lexClient)
        {
            _rekognitionClient = rekognitionClient;
            _transcribeClient = transcribeClient;
            _comprehendClient = comprehendClient;
            _lexClient = lexClient;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromForm] string imageKey)
        {
            // Rekognition
            Amazon.Rekognition.Model.DetectLabelsRequest rekognitionRequest = new Amazon.Rekognition.Model.DetectLabelsRequest
            {
                Image = new Amazon.Rekognition.Model.Image
                {
                    S3Object = new Amazon.Rekognition.Model.S3Object
                    {
                        Bucket = "PredictiveAnalyticsBucket",
                        Name = imageKey
                    }
                },
                MaxLabels = 10,
                MinConfidence = 75F
            };

            Amazon.Rekognition.Model.DetectLabelsResponse rekognitionResponse = await _rekognitionClient.DetectLabelsAsync(rekognitionRequest);

            // Transcribe
            Amazon.TranscribeService.Model.StartTranscriptionJobRequest transcribeRequest = new Amazon.TranscribeService.Model.StartTranscriptionJobRequest
            {
                TranscriptionJobName = "your-transcription-job-name",
                LanguageCode = Amazon.TranscribeService.LanguageCode.EnUS,
                Media = new Amazon.TranscribeService.Model.Media
                {
                    MediaFileUri = "s3://PredictiveAnalyticsBucket/audio-file-0001.mp3"
                },
                OutputBucketName = "your-bucket-name"
            };

            Amazon.TranscribeService.Model.StartTranscriptionJobResponse transcribeResponse = await _transcribeClient.StartTranscriptionJobAsync(transcribeRequest);

            // Comprehend
            Amazon.Comprehend.Model.DetectSentimentRequest comprehendRequest = new Amazon.Comprehend.Model.DetectSentimentRequest
            {
                Text = "some-text-to-analyze",
                LanguageCode = Amazon.Comprehend.LanguageCode.En
            };

            Amazon.Comprehend.Model.DetectSentimentResponse comprehendResponse = await _comprehendClient.DetectSentimentAsync(comprehendRequest);

            // Lex
            Amazon.LexRuntimeV2.Model.RecognizeTextRequest lexRequest = new Amazon.LexRuntimeV2.Model.RecognizeTextRequest
            {
                BotId = "bot-id-0001",
                BotAliasId = "bot-alias-id-0001",
                LocaleId = "en_US",
                SessionId = "session-id-0001",
                Text = "user-input-text"
            };

            Amazon.LexRuntimeV2.Model.RecognizeTextResponse lexResponse = await _lexClient.RecognizeTextAsync(lexRequest);


            var tflr = TensorflowAI.GetLinearRegressionResults();

            System.Collections.ArrayList output = new System.Collections.ArrayList
            {
                rekognitionResponse, tflr
            };

            // return Ok();
            return Ok(output);
        }
    }
}
